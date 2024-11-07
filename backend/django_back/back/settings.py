from pathlib import Path
from dotenv import load_dotenv
import os
from dotenv import load_dotenv
from stocks.utils import get_approval

load_dotenv()

# 환경 변수 설정
REAL_APP_KEY = os.getenv('REAL_APP_KEY')
REAL_APP_SECRET = os.getenv('REAL_APP_SECRET')
REAK_ACCOUNT = os.getenv('REAK_ACCOUNT')
REAL_API_TOKEN = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImI4YjkzZTNhLWZkMDEtNGI5Yi1iNmRmLWQwNzFhYzAxMzYyNiIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTczMTAzODA4MywiaWF0IjoxNzMwOTUxNjgzLCJqdGkiOiJQU3RNYTc5ejI1S2EwT1dmU2RNdlpsaldYbURGVEFuZzV1ZkwifQ.nTinQY4pFuzF9vpgMxkm4ZXpmOLj0klxt044QP_y3SOh77nK_4LboCS5t5vB9GrofpK7MuLAaqa0x4kQz10zYA"
# 이거 어캐 수정하지
# 6시간에 한번씩 값을 수정해주고싶은뒈

PAPER_APP_KEY = os.getenv('PAPER_APP_KEY')
PAPER_APP_SECRET = os.getenv('PAPER_APP_SECRET')
PAPER_ACCOUNT = os.getenv('PAPER_ACCOUNT')
PAPER_API_TOKEN = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjZkZDg4MDI4LWRmZTUtNGU2MC1hNmY5LWQ4NjJkNzdkYmVlYyIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTczMTAzNzYxOCwiaWF0IjoxNzMwOTUxMjE4LCJqdGkiOiJQU3RMazhjTXhjM2xoWXpkT0FiNW1FbUFibDJVTlhzcEhCS0QifQ.Uf8uVq_OSleaUqKlxY79uV7aHddpe_4rjoOVoVkJgXapYksOaDRnhk32Uh0i_IgLCk20791KUQQfO7bxZvAr1w"

## 싸피 IP 쓰면 이 부분이 안돼
REAL_APPROVAL_KEY = get_approval('real')
PAPER_APPROVAL_KEY = get_approval('paper')

load_dotenv()


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

AUTH_USER_MODEL = 'accounts.User'

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-s!o*2vi_^u0peb6f*_5x%6=^9f!b!jqjo2%8sqoefkk83+*vg%'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES' : [
        'rest_framework.authentication.TokenAuthentication',
    ],
}

REST_USE_JWT = True

ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = "optional"
ACCOUNT_AUTHENTICATION_METHOD = 'username'
ACCOUNT_USERNAME_REQUIRED = True

SITE_ID =1

LOGIN_REDIRECT_URL = '/'
# Application definition

INSTALLED_APPS = [
    'accounts',
    'stocks', 
    'channels', 
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'dj_rest_auth',
    'corsheaders',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'dj_rest_auth.registration',
    'allauth.socialaccount.providers.google',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS =[
    'http://127.0.0.1:5173',
    'http://localhost:5173',
    'https://k11a204.p.ssafy.io', 
]

ROOT_URLCONF = 'back.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'back.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'modumotu',
        'USER' : 'root',
        'PASSWORD' : os.getenv("MYSQL_PASSWORD"),
        'HOST' : '127.0.0.1',
        'PORT' : '3306',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ASGI 설정
ASGI_APPLICATION = "back.asgi.application"

# Channels Layer 설정 (기본으로 Redis를 추천하지만, 개발용으로 In-Memory Layer 사용 가능)
# 둘의 차이점을 알아보고 추후 수정해보자
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer",
    },
}

CRONJOBS = [
    ('0 18 * * *', 'stocks.management.commands.move_to_mysql')  # 매일 오후 6시에 실행
]

ENVIRONMENT = os.getenv('ENVIRONMENT')
if ENVIRONMENT == 'local':
    REDIS_HOST = '127.0.0.1'
elif ENVIRONMENT == 'server':
    REDIS_HOST = '172.18.0.4'
REDIS_PORT = 6379
REDIS_DB = 0

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": f"redis://{REDIS_HOST}:{REDIS_PORT}/{REDIS_DB}",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}

# Celery 설정
CELERY_BROKER_URL = f'redis://{REDIS_HOST}:{REDIS_PORT}/0'
CELERY_RESULT_BACKEND = f'redis://{REDIS_HOST}:{REDIS_PORT}/0'
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',  # 프론트엔드 URL
    'http://127.0.0.1/',    # 실제 도메인
]
