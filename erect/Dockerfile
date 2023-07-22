FROM selenium/standalone-chrome:108.0
USER root
RUN apt update
RUN apt install -y python python3-pip
WORKDIR /app
ADD requirements.txt .
RUN pip3 install -r requirements.txt
ADD decompile.py .
ADD .env example.env
ADD snaps_backend ./snaps_backend
EXPOSE 8000
CMD ["python3", "decompile.py"]

