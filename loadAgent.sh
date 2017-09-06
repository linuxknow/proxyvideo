#!/bin/bash

#/*
# * loadAgent.sh - A Bash Implementation
# * loadAgent.sh
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

agente=$(/usr/bin/shuf -i1-18 -n1)

/usr/bin/python /srv/nodejs/browser_list.py -b $agente
