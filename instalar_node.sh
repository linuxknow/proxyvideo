#!/bin/bash
#/*
# * instalar_node.sh - A Bash Implementation
# * instalar_node.sh
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

n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; cp -vr $n/{bin,lib,share} /srv/nodejs

