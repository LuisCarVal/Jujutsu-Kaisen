#!/bin/sh
echo "Ejecutando pre-commit hook"

echo "Ejecutando linteo"
npm run test

echo "Pre-commit finalizado correctamente"
exit 0
