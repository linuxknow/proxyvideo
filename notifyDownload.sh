#!/bin/bash
#/*
# * notifyDownload.sh - A Bash Implementation
# * notifyDownload.sh
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
#Aqui tiene que estar el directorio donde esta el svn actualmente
#
#touch /home/www/desarrollo/sync-svn.pid
#export LANGUAGE=en_US
export LANGUAGE=es_AR:es
export LANG=es_AR.UTF-8
. /srv/nodejs/var.sh
homeapp=$HOMETXT
#repo_svn=/home/ttb/db
watch_dir="/tmp/url"
if [ ! -e $watch_dir ];then
  mkdir $watch_dir
fi
file_url="$watch_dir/url.txt"
download_process="$homeapp/apply.txt"
salida_log="$homeapp/log-url-download.log"
comando="/srv/nodejs/Command.sh"


if [ ! -e $download_process ];then
	touch $download_process
fi

while true;do
	/usr/bin/inotifywait -mrq --format "%w" -e modify $watch_dir |while read line
	do
		process=1
		if [ $process -eq 1 ];then
			fwrepo=$(echo $line |awk -F/ '{print $1}')
			echo "Detected Changes/commits on ${fwrepo} at $(date +%c)" >> $salida_log
			for info_url in `cat $file_url`;do
				existe=`cat $download_process | grep $info_url`
				if [ -z $existe ];then
				  $comando $info_url
				  echo "Estado: $?"
				fi
			done
		fi
	done
	process=0
done
