from django.db import models


class Client(models.Model):
    name = models.CharField("Ім'я", max_length=50)
    last_name = models.CharField("Прізвище", max_length=50)
    email = models.CharField("Електронна пошта", max_length=100)
    phone_num = models.CharField("Номер телефону*", max_length=13, blank=True)

    def __str__(self):
        return f"{self.name} {self.last_name}"

    class Meta:
        verbose_name = 'Клієнт'
        verbose_name_plural = 'Клієнти'


class Servant(models.Model):
    s_name = models.CharField("Ім'я", max_length=50)
    s_last_name = models.CharField("Прізвище", max_length=50)
    s_phone_num = models.CharField("Номер телефону", max_length=13)
    work_experience = models.CharField("Стаж роботи (років)", max_length=2)

    def __str__(self):
        return f"{self.s_name} {self.s_last_name}"

    class Meta:
        verbose_name = 'Офіціант'
        verbose_name_plural = 'Офіціанти'


class Table(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='tables', verbose_name="Клієнт")
    servant = models.ForeignKey(Servant, on_delete=models.CASCADE, related_name='tables', verbose_name='Офіціант')
    table_num = models.CharField("Номер столику", max_length=3)
    capacity = models.CharField("Вмістимість", max_length=2)
    date = models.DateTimeField('Дата бронювання')

    def __str__(self):
        return self.table_num

    class Meta:
        verbose_name = 'Столик'
        verbose_name_plural = 'Столики'
