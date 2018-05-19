#!/usr/bin/python3
# -*- coding: utf-8 -*-

# Ne pas se soucier de ces imports
import setpath
from bs4 import BeautifulSoup
from json import loads
from urllib.request import urlopen
from urllib.parse import urlencode
import urllib


# Si vous écrivez des fonctions en plus, faites-le ici


def getJSON(page):
    params = urlencode({
      'format': 'json',  # TODO: compléter ceci
      'action': 'parse',  # TODO: compléter ceci
      'prop': 'text',  # TODO: compléter ceci
      'redirects': 'true',  # TODO: compléter ceci
      'page': page})
    API = "https://fr.wikipedia.org/w/api.php" # TODO: changer ceci
    response = urlopen(API + "?" + params)
    return response.read().decode('utf-8')


def getRawPage(page):
    parsed = loads(getJSON(page))
    try:
        title = parsed['parse']['title']  # TODO: remplacer ceci
        content = parsed['parse']['text']  # TODO: remplacer ceci
        return title, content
    except KeyError:
        # La page demandée n'existe pas
        return None, None


def getPage(page):
    title, content = getRawPage(page)
    list_link = []
    soup = BeautifulSoup(str(content), 'html.parser')
    main_div = soup.find("div")
    for p in main_div.find_all(["p"], recursive=False):
        for link in p.find_all('a'):
            if "/wiki/" in link.get('href'):
                href_link_init = link.get('href').replace("/wiki/", "")
                href_link_encoded = urllib.parse.unquote(href_link_init, encoding='utf-8')
                href_link_clean_1 = href_link_encoded.split("#")[0]
                href_link_clean_2 = href_link_clean_1.replace('_', ' ')
                if ("Aide:" in href_link_clean_2) or (href_link_clean_2 in list_link):
                    pass
                else:
                    list_link.append(href_link_clean_2)
    return title, list_link[:10]




if __name__ == '__main__':
    # Ce code est exécuté lorsque l'on exécute le fichier
    print("Ça fonctionne !")

    # Voici des idées pour tester vos fonctions :
    #print(getJSON("Utilisateur:A3nm/INF344"))
    #print(getRawPage("Utilisateur:A3nm/INF344"))
    #print(getRawPage("Histoire"))
    #getJSON("Utilisateur:A3nm/INF344")
    print(getPage("Utilisateur:A3nm/INF344"))
    #getPage("Histoire")
