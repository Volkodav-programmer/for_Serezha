from django.contrib import admin
from .models import Client, Table, Servant


class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'last_name', 'email', 'phone_num')
    search_fields = ('name', 'last_name', 'email', 'phone_num')


class ServantAdmin(admin.ModelAdmin):
    list_display = ('s_name', 's_last_name', 's_phone_num', 'work_experience')
    search_fields = ('s_name', 's_last_name', 'work_experience')


class TableAdmin(admin.ModelAdmin):
    list_display = ('table_num', 'capacity', 'date', 'client', 'servant')
    search_fields = ('table_num', 'client__name', 'client__last_name', 'servant__s_name', 'servant__s_last_name')


admin.site.register(Servant, ServantAdmin)
admin.site.register(Client, ClientAdmin)
admin.site.register(Table, TableAdmin)
