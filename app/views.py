from contextlib import _RedirectStream
from django.shortcuts import render
import hashlib
import time
from .models import userinfo,complains
from app.models import userinfo
from django.shortcuts import get_object_or_404, render, redirect
# Create your views here.


def userlogin(request):

    user = request.user
    if request.method == 'POST':
        email = request.POST.get("email")
        password = request.POST.get("password")
        
        
        #Email hashing process
        str2hash = str(email)                       
        result = hashlib.md5(str2hash.encode())     
        hashmail=str(result.hexdigest())            #69468a6b711efb0a0d921e417a316a55
        #assigning data to the object
        userinfos = userinfo(hashEmail=hashmail, password=password)
        #saving the hashcode to database
        userinfos.save()
        
        
        return redirect("Register")
    
    
    return render(request,'register.html')


def login(request):
    
    if request.method == 'POST':
        email = request.POST.get("email")
        password = request.POST.get("password")
        str2hash = str(email)
    
        result = hashlib.md5(str2hash.encode())
        print(result)
        
        hashmail=str(result.hexdigest())
        
        infouser = userinfo.objects.filter()
        
        for i in infouser:
            print(i.hashEmail)
            print(i.password)
            if(i.hashEmail==hashmail and i.password==password):
                request.session['mail'] = hashmail
                request.session['islogged'] = "yes"
               
                return redirect("userdashboard")
            else:  
                print("unsuccessful")
    
    return render(request,'index.html')


def userdashboard(request):
    if 'islogged' not in request.session:
        return redirect("index")
    
    return render(request,'user_dashboard.html')

def usercomplain(request):
    if request.method == 'POST':
        sub0 = request.POST.get("subject")
        desc0 = request.POST.get("description")
        mail0 = request.session['mail']
        comp = complains(subject=sub0, desc=desc0, hashEmail=mail0)
        comp.save()
    
    return render(request,'user_complain.html')


def complainlist(request):
    data = complains.objects.filter(hashEmail=request.session['mail'])
    request.session['role'] = "user"
    args={
        
        'data' : data
        
    }
    print(data)

    return render(request,'user_complain_list.html',args)


def logout(request):
    del request.session['role']
    del request.session['mail']
    del request.session['islogged']
    return redirect("Register")