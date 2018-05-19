/*function makeLineChart(dataset, xName, formatTime, yObjs, axisLables) {
      var chartObj = {};
      var color = d3.scale.category10();
      chartObj.xAxisLable = axisLables.xAxis;
      chartObj.yAxisLable = axisLables.yAxis;

      chartObj.data = dataset;
      chartObj.margin = {top: 50, right: 60, bottom: 35, left: 70};
      chartObj.width = 650 - chartObj.margin.left - chartObj.margin.right;
      chartObj.height = 480 - chartObj.margin.top - chartObj.margin.bottom;

  // So we can pass the x and y as strings when creating the function
      chartObj.xFunct = function(d){return d[xName]};

  // For each yObjs argument, create a yFunction
      function getYFn(column) {
          return function (d) {
              return d[column];
          };
      }

  // Object instead of array
      chartObj.yFuncts = [];
      for (var y  in yObjs) {
          yObjs[y].name = y;
          yObjs[y].yFunct = getYFn(yObjs[y].column); //Need this  list for the ymax function
          chartObj.yFuncts.push(yObjs[y].yFunct);
      }

  //Formatter functions for the axes
      chartObj.formatAsNumber = d3.format(".0f");
      chartObj.formatAsDecimal = d3.format(".2f");
      chartObj.formatAsCurrency = d3.format("$.2f");
      chartObj.formatAsFloat = function (d) {
          if (d % 1 !== 0) {
              return d3.format(".2f")(d);
          } else {
              return d3.format(".0f")(d);
          }

      };

      chartObj.xFormatter = chartObj.formatAsNumber;
      chartObj.yFormatter = chartObj.formatAsFloat;

      chartObj.bisectYear = d3.bisector(chartObj.xFunct).left; //< Can be overridden in definition

  //Create scale functions
      chartObj.xScale = d3.scale.linear().range([0, chartObj.width]).domain(d3.extent(chartObj.data, chartObj.xFunct)); //< Can be overridden in definition

  // Get the max of every yFunct
      chartObj.max = function (fn) {
          return d3.max(chartObj.data, fn);
      };
      chartObj.yScale = d3.scale.linear().range([chartObj.height, 0]).domain([0, d3.max(chartObj.yFuncts.map(chartObj.max))]);

      chartObj.formatAsYear = d3.format("%m-%Y");

  //Create axis
      // chartObj.xAxis = d3.svg.axis().scale(chartObj.xScale).orient("bottom").tickFormat(chartObj.xFormatter); //< Can be overridden in definition
      chartObj.xAxis = d3.svg.axis().scale(chartObj.xScale).orient("bottom").tickFormat(formatTime); //< Can be overridden in definition
      chartObj.yAxis = d3.svg.axis().scale(chartObj.yScale).orient("left").tickFormat(chartObj.yFormatter); //< Can be overridden in definition


  // Build line building functions
      function getYScaleFn(yObj) {
          return function (d) {
              return chartObj.yScale(yObjs[yObj].yFunct(d));
          };
      }
      for (var yObj in yObjs) {
          yObjs[yObj].line = d3.svg.line().interpolate("cardinal").x(function (d) {
              return chartObj.xScale(chartObj.xFunct(d));
          }).y(getYScaleFn(yObj));
      }


      chartObj.svg;

  // Change chart size according to window size
      chartObj.update_svg_size = function () {
          chartObj.width = parseInt(chartObj.chartDiv.style("width"), 10) - (chartObj.margin.left + chartObj.margin.right);

          chartObj.height = parseInt(chartObj.chartDiv.style("height"), 10) - (chartObj.margin.top + chartObj.margin.bottom);

          chartObj.xScale.range([0, chartObj.width]);
          chartObj.yScale.range([chartObj.height, 0]);

          if (!chartObj.svg) {return false;}

          chartObj.svg.select('.x.axis').attr("transform", "translate(0," + chartObj.height + ")").call(chartObj.xAxis);
          chartObj.svg.select('.x.axis .label').attr("x", chartObj.width / 2);

          chartObj.svg.select('.y.axis').call(chartObj.yAxis);
          chartObj.svg.select('.y.axis .label').attr("x", -chartObj.height / 2);

          for (var y  in yObjs) {
              yObjs[y].path.attr("d", yObjs[y].line);
          }


          d3.selectAll(".focus.line").attr("y2", chartObj.height);

          chartObj.chartDiv.select('svg').attr("width", chartObj.width + (chartObj.margin.left + chartObj.margin.right)).attr("height", chartObj.height + (chartObj.margin.top + chartObj.margin.bottom));

          chartObj.svg.select(".overlay").attr("width", chartObj.width).attr("height", chartObj.height);
          return chartObj;
      };

      chartObj.bind = function (selector) {
          chartObj.mainDiv = d3.select(selector);
          // Add all the divs to make it centered and responsive
          chartObj.mainDiv.append("div").attr("class", "inner-wrapper").append("div").attr("class", "outer-box").append("div").attr("class", "inner-box");
          chartSelector = selector + " .inner-box";
          chartObj.chartDiv = d3.select(chartSelector);
          d3.select(window).on('resize.' + chartSelector, chartObj.update_svg_size);
          chartObj.update_svg_size();
          return chartObj;
      };

  // Render the chart
      chartObj.render = function () {
          //Create SVG element
          chartObj.svg = chartObj.chartDiv.append("svg").attr("class", "chart-area").attr("width", chartObj.width + (chartObj.margin.left + chartObj.margin.right)).attr("height", chartObj.height + (chartObj.margin.top + chartObj.margin.bottom)).append("g").attr("transform", "translate(" + chartObj.margin.left + "," + chartObj.margin.top + ")");


          // Draw Lines
          for (var y  in yObjs) {
              yObjs[y].path = chartObj.svg.append("path").datum(chartObj.data).attr("class", "line").attr("d", yObjs[y].line).style("stroke", color(y)).attr("data-series", y).on("mouseover", function () {
                  focus.style("display", null);
              }).on("mouseout", function () {
                  focus.transition().delay(700).style("display", "none");
              }).on("mousemove", mousemove);
          }


          // Draw Axis
          chartObj.svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + chartObj.height + ")").call(chartObj.xAxis).append("text").attr("class", "label").attr("x", chartObj.width / 2).attr("y", 35).style("text-anchor", "middle").text(chartObj.xAxisLable);

          chartObj.svg.append("g").attr("class", "y axis").call(chartObj.yAxis).append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", -50).attr("x", -chartObj.height / 2).attr("dy", ".71em").style("text-anchor", "middle").text(chartObj.yAxisLable);

          // Title
          chartObj.svg.append("text")
                      .attr("x", (chartObj.width / 2))
                      .attr("y", 0-20)
                      .attr("text-anchor", "middle")
                      .style("font-size", "16px")
                      .style("text-decoration", "underline")
                      .text("Ventes et Livraisons des journaux");

          //Draw tooltips
          var focus = chartObj.svg.append("g").attr("class", "focus").style("display", "none");

          for (var y  in yObjs) {
              yObjs[y].tooltip = focus.append("g");
              yObjs[y].tooltip.append("circle").attr("r", 5);
              yObjs[y].tooltip.append("rect").attr("x", 8).attr("y","-5").attr("width",22).attr("height",'0.75em');
              yObjs[y].tooltip.append("text").attr("x", 9).attr("dy", ".35em");
          }

          // Year label
          focus.append("text").attr("class", "focus year").attr("x", 9).attr("y", 7);
          // Focus line
          focus.append("line").attr("class", "focus line").attr("y1", 0).attr("y2", chartObj.height);

          //Draw legend
          var legend = chartObj.mainDiv.append('div').attr("class", "legend");
          for (var y  in yObjs) {
              series = legend.append('div');
              series.append('div').attr("class", "series-marker").style("background-color", color(y));
              series.append('p').text(y);
              yObjs[y].legend = series;
          }

          // Overlay to capture hover
          chartObj.svg.append("rect").attr("class", "overlay").attr("width", chartObj.width).attr("height", chartObj.height).on("mouseover", function () {
              focus.style("display", null);
          }).on("mouseout", function () {
              focus.style("display", "none");
          }).on("mousemove", mousemove);

          return chartObj;
          function mousemove() {
              var x0 = chartObj.xScale.invert(d3.mouse(this)[0]), i = chartObj.bisectYear(dataset, x0, 1), d0 = chartObj.data[i - 1], d1 = chartObj.data[i];
              try {
                  var d = x0 - chartObj.xFunct(d0) > chartObj.xFunct(d1) - x0 ? d1 : d0;
              } catch (e) { return;}
              minY = chartObj.height;
              for (var y  in yObjs) {
                  yObjs[y].tooltip.attr("transform", "translate(" + chartObj.xScale(chartObj.xFunct(d)) + "," + chartObj.yScale(yObjs[y].yFunct(d)) + ")");
                  yObjs[y].tooltip.select("text").text(chartObj.yFormatter(yObjs[y].yFunct(d)));
                  minY = Math.min(minY, chartObj.yScale(yObjs[y].yFunct(d)));
              }

              focus.select(".focus.line").attr("transform", "translate(" + chartObj.xScale(chartObj.xFunct(d)) + ")").attr("y1", minY);
              focus.select(".focus.year").text("Year: " + chartObj.xFormatter(chartObj.xFunct(d)));
          }

      };
      return chartObj;
  }

*/











  const w = 100, h = 100;
  const margin = {
      top: 10,
      right: 10,
      bottom: 60,
      left: 60,
  };
  const innerW = w - margin.left - margin.right;
  const innerH = h - margin.top - margin.bottom;

  //let dataset = [];
  let x, y;
  let bisectDate = d3.bisector(d => d.date).left;

  //Create SVG element
  let svg = d3.select("#chart-line1")
      .append("svg")
      .attr("width", w+40) //Pour afficher les valeurs en fin de courbe
      .attr("height", h)
      .attr("id", "depChart")
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  let parseTime = d3.timeParse("%m-%Y");
  let formatTime = d3.timeFormat("%m-%Y");

  let svgHTML = document.getElementById("depChart");

  d3.csv("date-test-01.csv")
      /* On load les colonnes de notre csv */
      .row(d => {
          return {
              date: parseTime(d.Date),
              deliveries: +d.Delivered,
              sales: +d.Sales
          }
      })
      /* On les scale entre la plus petite et la plus grande valeur selon la taille de notre fenêtre */
      .get((error, rows) => {
          if (rows.length > 0) {
              x = d3.scaleLinear()
                  .domain(d3.extent(rows, row => row.date))
                  .range([0, innerW]);
              y = d3.scaleLinear()
                  .domain([0, d3.max(rows, row => Math.max(row.deliveries, row.sales))])
                  .range([innerH, 0]);
              draw(rows);
          }
      });

  function draw(data) {

      /* On créé une variable courbe pour les sales */
      let valuelineSales = d3.line()
          .x(d => x(d.date))
          .y(d => y(d.sales))
          .curve(d3.curveCardinal); // Pour avoir des courbes linéaires
      /* On créé une variable courbe pour les deliveries */
      let valuelineDelivered = d3.line()
          .x(d => x(d.date))
          .y(d => y(d.deliveries))
          .curve(d3.curveCardinal);

      /* On ajoute groupé à la fenêtre initiale un axe à x au bon format (date) */
      svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + innerH + ")")
          .call(d3.axisBottom(x)
              .tickFormat(formatTime))
          .selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)");

      /* On ajoute groupé à la fenêtre initiale un axe à y */
      svg.append("g")
          .attr("class", "axis")
          .call(d3.axisLeft(y));

      /* On dessine la variable valuelineSales */
      svg.append("path")
          .data([data])
          .attr("class", "line")
          .attr("id", "sales")
          .attr("d", valuelineSales)
          .transition() // On ajoute ces lignes pour dessiner les courbes en direct
          .duration(2000)
          .attrTween("stroke-dasharray", function() {
              var len = this.getTotalLength();
              return function(t) { return (d3.interpolateString("0," + len, len + ",0"))(t) };
          });


      /* On dessine la variable valuelineDelivered */
      svg.append("path")
          .data([data])
          .attr("class", "line")
          .attr("id", "deliveries")
          .attr("d", valuelineDelivered)
          .transition() // On ajoute ces lignes pour dessiner les courbes en direct
          .duration(2000)
          .attrTween("stroke-dasharray", function() {
              var len = this.getTotalLength();
              return function(t) { return (d3.interpolateString("0," + len, len + ",0"))(t) };
          });




      /* Par dessus le chart, on ajoute un rectangle invisible */
      /* Une variable focus sera initialisée à null quand la souris sera sur le rectangle
      * puis mooifiée dans mousemove sinon elle sera null est donc non visible
      * Focus c'est le rond qu'on verra sur notre courbe */
      svg.append("rect")
          .attr("class", "overlay")
          .attr("width", innerW)
          .attr("height", innerH)
          .on("mouseover", () => (focus_sales.style("display", null) & focus_deliveries.style("display", null)))
          .on("mouseout", () => (focus_sales.style("display", "none") & focus_deliveries.style("display", "none")))
          .on("mousemove", mousemove);

      /* Initialisation de focus */
      let focus_sales = svg.append("g")
          .attr("class", "focus_sales")
          .style("display", "none");

      /* Dessin de la variable focus comme étant un cercle de rayon 4.5 px */
      focus_sales.append("circle")
          .attr("r", 4.5);

      /* Ajout d'un texte sur focus */
      focus_sales.append("text")
          .attr("x", 9)
          .attr("dy", ".35em");

      /* Initialisation de focus */
      let focus_deliveries = svg.append("g")
          .attr("class", "focus_deliveries")
          .style("display", "none");

      /* Dessin de la variable focus comme étant un cercle de rayon 4.5 px */
      focus_deliveries.append("circle")
          .attr("r", 4.5);

      /* Ajout d'un texte sur focus */
      focus_deliveries.append("text")
          .attr("x", 9)
          .attr("dy", ".35em");



      focus_deliveries.append("line")
          .attr("class", "x-hover-line hover-line")
          .attr("y1", 0)
          .attr("y2", innerH);

      focus_deliveries.append("line")
          .attr("class", "y-hover-line hover-line")
          .attr("x1", innerW)
          .attr("x2", innerW);



      /* La fonction mousemove */
      function mousemove() {
          let x0 = x.invert(d3.mouse(this)[0]),
              i = bisectDate(data, x0, 1),
              d0 = data[i - 1],
              d1 = data[i],
              d = x0 - d0.date > d1.date - x0 ? d1 : d0; // sorte de if pour trouver le point le plus proche
          focus_sales.attr("transform", "translate(" + x(d.date) + "," + y(d.sales) + ")");
          focus_sales.select("text").text(d.sales);

          focus_deliveries.select(".x-hover-line").attr("y2", innerH - y(d.deliveries));
          focus_deliveries.attr("transform", "translate(" + x(d.date) + "," + y(d.deliveries) + ")");
          focus_deliveries.select("text").text(d.deliveries);

      }
  }
