#!/bin/bash
for d in packages/* ; do
  echo "$d"
  cd $d
  npm publish
  cd ../../
done
