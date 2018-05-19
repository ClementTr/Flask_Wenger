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
