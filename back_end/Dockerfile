FROM python:3.8-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /usr/TaskManager/back_end

COPY requirements.txt ./

RUN apt-get update \
    && pip install --no-cache-dir -r requirements.txt \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 8000

CMD python task_manager/manage.py runserver 0.0.0.0:8000