#!/bin/bash

#/*
# * servicios.sh - A Bash Implementation
# * servicios.sh
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

start-stop-daemon -v --start --make-pidfile --oknodo --user nodejs --name nodejs_test --pidfile /srv/nodejs/nodejs.pid --startas /srv/nodejs/iniciar.sh --chuid nodejs -- --daemon

