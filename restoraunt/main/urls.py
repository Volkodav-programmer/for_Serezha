from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('<str:lang>/', views.index, name='home_en'),
    path('Меню', views.menu, name='menu'),
    path('Замовлення', views.order, name='order'),
    path('Бронювання', views.reservation, name='reservation'),
]
