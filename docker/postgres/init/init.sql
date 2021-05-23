SET client_encoding = 'UTF8';
-- 更新時にTIMESTAMPを自動でアップデートする関数
CREATE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
      NEW.updated_at = now();
      RETURN NEW;
  END;
  $$ language 'plpgsql';

CREATE TABLE users (
  id SERIAL NOT NULL,
  name varchar(64) NOT NULL,
  hobby varchar(64) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (id)
);

CREATE TRIGGER update_user_modtime
  BEFORE UPDATE
  ON users
  FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

INSERT INTO users (name, hobby) VALUES
('野比 のび太', '睡眠'),
('剛田 武', 'カラオケ'),
('源 静香', 'テニス')
;