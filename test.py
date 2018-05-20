#!/usr/bin/python3
# -*- coding: utf-8 -*-
from getpage import getPage

def test_success(success):
    if success in [-1, 0, 1]:
        return True
    print("Fail success")
    return False

def check_cheater(cheater):
    if cheater < 1:
        print("Fail Cheater")
        return False
    return True

def test_wenger():
    title_test, links_test = getPage("Arsène Wenger")
    assert(title_test == "Arsène Wenger")
    assert(links_test == ["22 octobre en sport", "1949 en football", "Strasbourg", "Football",
                          "France", "Défenseur (football)", "1963 en football", "1981 en football",
                          "Entraîneur", "Association sportive de Mutzig"])
    print("Test getPage Wenger OK")

if __name__ == '__main__':
    test_wenger()
