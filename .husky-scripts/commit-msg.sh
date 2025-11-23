#!/bin/sh
echo "Ejecutando commit-msg hook"
commit_msg_file=$1
commit_msg=$(head -n1 "$commit_msg_file")

pattern="^(feat|fix|docs|chore|refactor|test|style|perf|ci)(\(.+\))?: .{1,50}$"

if ! echo "$commit_msg" | grep -qE "$pattern"; then
  echo "ERROR: Mensaje de commit inválido."
  echo "Debe seguir el formato:"
  echo "tipo(opcional_scope): descripción breve (max 50 chars)"
  echo "Tipos permitidos: feat, fix, docs, chore, refactor, test, style, perf, ci"
  exit 1
fi
exit 0
