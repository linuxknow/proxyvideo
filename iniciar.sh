#!/bin/bash
# * iniciar.sh - A Bash Implementation
# * iniciar.sh
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

source /srv/nodejs/.bash_profile
existe_node=`which nodejs`
if [ ! -e $existe_node ];then
  echo "No existe nodejs" >> /srv/nodejs/nodejs.log
  exit 1
fi
nohup /srv/nodejs/notifyDownload.sh &
pid=`pidof notifyDownload.sh`
nohup node /srv/nodejs/proxy.js &
