if [ -f ".env" ]; then
  echo ".envファイルが存在しているので、作成せず終了します。"
else
cat <<EOF > .env
ENV_HOST = localhost
ENV_DB = prello
ENV_USER = user
ENV_PASSWORD = password
ENV_PORT = 5432
EOF
fi
