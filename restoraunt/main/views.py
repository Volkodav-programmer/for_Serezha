from django.shortcuts import render


def index(request, lang=None):
    if lang == 'en':
        content = 'ABOUT US'
    else:
        content = 'ПРО НАС'
    return render(request, 'main/Home page.html', {'content': content})


def menu(request):
    return render(request, 'main/Menu.html')


def order(request):
    return render(request, 'main/order.html')


def reservation(request):
    return render(request, 'main/reservation.html')
