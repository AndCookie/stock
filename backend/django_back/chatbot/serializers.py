from .models import Message
from rest_framework import serializers

class MessageSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        field = '__all__'