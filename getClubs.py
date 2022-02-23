from bs4 import BeautifulSoup
import requests
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def get_credential():
    cred = credentials.Certificate("ajouraxas-b3bcc065e772.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    return db


def what_simple_info(text):
    if "위치" in text:
        return "location"
    elif "연락처" in text:
        return "tel"
    elif "모집기간" in text:
        return "recruitment_period"
    elif "#" in text:
        return "category"
    else:
        return "recruitment_period"


def get_info():
    global club_list
    for i in range(1, 1000):
        club_page = requests.get("https://www.ajou.ac.kr/kr/guide/club-" + str(i) + ".do")
        if club_page.status_code == 404:
            break
        club_soup = BeautifulSoup(club_page.content, "html.parser")
        club_list.append(
            {"name": "", "category": "", "description": "", "full_description": "", "location": "", "tel": "", "recruitment_period": ""})
        club_list[i - 1]["name"] = club_soup.find("div", {"class": "support-box"}).find("p").text
        club_simple_infos = club_soup.find_all("ul", {"class": "ul-type01"})

        for club_simple_info in club_simple_infos:
            try:
                club_list[i - 1][what_simple_info(club_simple_info.find("li").text)] = club_simple_info.find("li").text
                club_list[i - 1][
                    what_simple_info(club_simple_info.find("li").find_next_sibling().text)] = club_simple_info.find(
                    "li").find_next_sibling().text
                club_list[i - 1][what_simple_info(
                    club_simple_info.find("li").find_next_sibling().find_next_sibling().text)] = club_simple_info.find(
                    "li").find_next_sibling().find_next_sibling().text
                club_list[i - 1][what_simple_info(club_simple_info.find(
                    "li").find_next_sibling().find_next_sibling().find_next_sibling().text)] = club_simple_info.find(
                    "li").find_next_sibling().find_next_sibling().find_next_sibling().text
            except:
                pass
        club_description = club_soup.find("p", {"class": "con-p no-pd"})
        club_list[i - 1]["description"] = club_description.text

        club_full_description_parent = club_soup.select(".inner-box:first-child .con-p.no-pd")
        club_full_description = ""
        for club_full_description_slice in club_full_description_parent:
            club_full_description += club_full_description_slice.text
        club_list[i-1]["full_description"] = club_full_description

        print(i)

    for club in club_list:
        club["name"] = club["name"].replace("\xa0", "")
        club["category"] = club["category"].replace("\xa0", "")
        club["description"] = club["description"].replace("\xa0", "")
        club["full_description"] = club["full_description"].replace("\xa0", " ")
        club["location"] = club["location"].replace("\xa0", "")
        club["location"] = club["location"].replace("위치 :", "")
        club["tel"] = club["tel"].replace("\xa0", "")
        club["tel"] = club["tel"].replace("동아리 회장 연락처 :", "")
        club["recruitment_period"] = club["recruitment_period"].replace("\xa0", "")
        club["recruitment_period"] = club["recruitment_period"].replace("모집기간 :", "")
        club["recruitment_period"] = club["recruitment_period"].replace("커뮤니티 :", "")

    print(club_list)

club_list = []
get_info()
db = get_credential()
clubs_ref = db.collection('clubs')
for club in club_list:
    clubs_ref.add(club)