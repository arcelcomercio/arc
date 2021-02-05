import time
import colored
from colored import stylize
import requests
import sys,os,json

# signwall && paywall
time.sleep(200)
token_sandbox= os.getenv('TOKEN_SANDBOX')

urls_pro = ["https://elcomercio-elcomercio-sandbox.cdn.arcpublishing.com/pf/dist/page/pqrR8t1ciiXPTr/signwall.js?d="]
urls_pro.append (
    "https://elcomercio-elcomercio-sandbox.cdn.arcpublishing.com/pf/dist/template/paywall-payment/paywall.js?d=")
urls_pro.append ("https://elcomercio-gestion-sandbox.cdn.arcpublishing.com/pf/dist/page/pqrR8t1ciiXPTr/signwall.js?d=")
urls_pro.append (
    "https://elcomercio-gestion-sandbox.cdn.arcpublishing.com/pf/dist/template/paywall-payment/paywall.js?d=")

s = requests.Session()

req=s.get('https://api.sandbox.elcomercio.arcpublishing.com/deployments/fusion/services',
    headers={'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer '+ str(token_sandbox) }
)

response=req.json()
version="xxx"
for item in response['lambdas']:
    if item.get('Aliases',None) is None:
        version =item['Version']

count = 0
for pro in urls_pro:
    try:
        r = requests.head(pro + version)
        print(r.text)
        if r.status_code == 200:
            print(stylize (str (r.status_code) + ": " + pro + version, colored.fg ("green")))
        else:
            count = count + 1
            print (stylize (str (r.status_code) + ": " + pro + version, colored.fg ("red")))
    except requests.ConnectionError:
        print ("Error")

print("count",count)
if count > 0:
    raise Exception ("ocurrieron errores en la compilacion")
