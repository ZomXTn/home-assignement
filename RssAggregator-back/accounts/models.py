from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserManagerCustomised
from uuid import uuid4
from .utils import generate_random_password


class UserCustomised(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField("Adresse Mail", blank=False, unique=True)
    user_name = models.CharField(
        "Nom d'utilisateur", max_length=50, blank=False, unique=True
    )
    first_name = models.CharField("Prénom", max_length=50, blank=False)
    last_name = models.CharField("Nom", max_length=50, blank=False)
    phone_number = models.CharField(
        "Téléphone", max_length=50, unique=True, blank=False
    )
    adress = models.CharField("Adresse", max_length=120, blank=False)
    is_active = models.BooleanField("Compte actif ? ", default=False)
    is_staff = models.BooleanField("Staff ? ", default=False)
    objects = UserManagerCustomised()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["user_name", "first_name", "last_name", "phone_number", "adress"]
    is_first_login = models.BooleanField("Premier Login?", default=True)
    temporary_password = models.CharField(
        "Mot de passe temporaire", max_length=64, default=generate_random_password()
    )

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = "Utilisateurs"
