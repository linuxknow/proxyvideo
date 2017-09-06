#!/bin/bash
#/*
# * Command.sh - A Bash Implementation
# * command.sh
# * Copyright (C) 2014 linuxknow@gmail.com
# * This program is free software; you can redistribute it and/or modify
# * it under the terms of the GNU General Public License as published by
# * the Free Software Foundation; either version 2 of the License, or
# * (at your option) any later version.
# *
# * This program is distributed in the hope that it will be useful,
# * but WITHOUT ANY WARRANTY; without even the implied warranty of
# * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# * GNU General Public License for more details.
# *
# * You should have received a copy of the GNU General Public License along
# * with this program; if not, write to the Free Software Foundation, Inc.,
# */
#


. /srv/nodejs/var.sh

flv="$1"

output_file=$(openssl rand -hex 15)

type_file=$(echo "$flv" | cut -d'.' -f4)

FOLDER="/srv/nodejs/downloads"
STREAM_ONLINE=0

browser=$(/srv/nodejs/loadAgent.sh)

if [ $type_file=="m3u8" ];then
  STREAM_ONLINE=1
else
  comando="/usr/bin/wget -t 0 --random-wait --save-cookies $HOMETXT/$COOKIE_FILE_$output_file.txt --limit-rate=59k -4 --no-cookies --server-response --timeout=15 --inet4-only --dns-timeout=15 --connect-timeout=10 -d -b --user-agent='$browser' --append-output=/srv/nodejs/app_log.txt -O $FOLDER/$output_file -c "

fi

if [ ! -z "$flv" ];then
 if [ $STREAM_ONLINE -eq 0 ];then
   echo "$comando '$flv'" >> /srv/nodejs/nodejs.log
   $comando "$flv"
 else

   echo "/usr/bin/python /srv/nodejs/process.py -i '${flv}' -u '${browser}' -o '${FOLDER}/${output_file}.ts'" >> /srv/nodejs/nodejs.log

   /usr/bin/python /srv/nodejs/process.py -i "${flv}" -u "${browser}" -o "${FOLDER}/${output_file}.ts" &
   if [ $? -eq 0 ];then
     echo "Aplicacion downloading..." >> /srv/nodejs/nodejs.log
   else
     echo "Error al iniciar descarga con ffmpeg" >> /srv/nodejs/nodejs.log
   fi

 fi


 echo "$flv" >> $HOMETXT/apply.txt
fi

