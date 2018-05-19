#!/usr/bin/python3
# -*- coding: utf-8 -*-

# Ne pas se soucier de ces imports
from flask import Flask, render_template, session, request, redirect, flash
from getpage import getPage
import itertools
import setpath

app = Flask(__name__)

app.secret_key = "TODO: mettre une valeur secrète ici"
cache = {}
list_links = []
success = 0

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html', success=success)

@app.route('/new_game', methods=['GET', 'POST'])
def new_game():
    global success
    success = 0
    session['article'] = request.form['start']
    session['score'] = 0
    session['cheater'] = 0
    try:
        title = getPage(session['article'])[0]
    except AttributeError: #récupère l'erreur si la liste est vide
        success = -1
        session['score'] = 0
        flash("This word does not exist !")
        return redirect("/")

    if title == "Philosophie":
        success = -1
        session['score'] = 0
        flash("No you cannot do that, it's too easy !")
        return redirect("/")
    return redirect("/game")


@app.route('/game', methods=['GET', 'POST'])
def game():
    global cache, list_links, success

    session['cheater'] += 1
    cheater = 0
    if session['cheater'] >= 2:
        cheater = 1

    if session['article'] in cache.keys():
        print("I used cache")
        list_links = cache[session['article']]
    else:
        print("I used getPage")
        try:
            list_links = getPage(session['article'])[1]
            cache[session['article']] = list_links
        except AttributeError: #récupère l'erreur si la liste est vide
            success = -1
            session['score'] = 0
            flash("This link is not valid !")
            return redirect("/")


    if len(list_links) == 0:
        success = -1
        session['score'] = 0
        flash('It was an empty link !')
        return redirect("/")
    return render_template('game.html', list_links=list_links, cheater=cheater)


@app.route('/move', methods=['GET', 'POST'])
def move():
    global success
    if request.form['destination'] not in list_links:
        print(request.form['destination'])
        success = -1
        session['score'] = 0
        flash('Are you trying to cheat ?!')
        return redirect("/")
    session['score'] += 1
    session['article'] = request.form['destination']
    session['cheater'] = 0
    if session['article'] == "Philosophie":
        success = 1
        return redirect("/")
    return redirect("/game")


if __name__ == '__main__':
    app.run(debug=True)
