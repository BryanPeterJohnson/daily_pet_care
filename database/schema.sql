-- Daily Pet Care Blog — MySQL / MariaDB schema
-- Import this in Hostinger hPanel → Databases → phpMyAdmin → Import,
-- or run `npm run db:setup` (which also seeds categories, sample posts and the admin user).

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name          VARCHAR(120) NOT NULL,
  email         VARCHAR(191) NOT NULL,
  slug          VARCHAR(191) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('ADMIN','EDITOR','AUTHOR') NOT NULL DEFAULT 'AUTHOR',
  bio           TEXT NULL,
  avatar        VARCHAR(500) NULL,
  active        TINYINT(1) NOT NULL DEFAULT 1,
  last_login_at DATETIME NULL,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  UNIQUE KEY uq_users_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS categories (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(120) NOT NULL,
  slug        VARCHAR(191) NOT NULL,
  description TEXT NULL,
  image       VARCHAR(500) NULL,
  sort_order  INT NOT NULL DEFAULT 0,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tags (
  id   INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(191) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_tags_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- status: DRAFT | PENDING (author submitted for review) | PUBLISHED
-- A PUBLISHED post with published_at in the future is "scheduled" and stays hidden until then.
CREATE TABLE IF NOT EXISTS posts (
  id               INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title            VARCHAR(255) NOT NULL,
  slug             VARCHAR(191) NOT NULL,
  excerpt          TEXT NULL,
  content          LONGTEXT NOT NULL,
  cover_image      VARCHAR(500) NULL,
  cover_alt        VARCHAR(255) NULL,
  status           ENUM('DRAFT','PENDING','PUBLISHED') NOT NULL DEFAULT 'DRAFT',
  featured         TINYINT(1) NOT NULL DEFAULT 0,
  meta_title       VARCHAR(255) NULL,
  meta_description TEXT NULL,
  reading_time     INT NOT NULL DEFAULT 1,
  views            INT UNSIGNED NOT NULL DEFAULT 0,
  published_at     DATETIME NULL,
  author_id        INT UNSIGNED NOT NULL,
  category_id      INT UNSIGNED NULL,
  created_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_posts_slug (slug),
  KEY idx_posts_status_pub (status, published_at),
  KEY idx_posts_category (category_id),
  KEY idx_posts_author (author_id),
  FULLTEXT KEY ft_posts_search (title, excerpt),
  CONSTRAINT fk_posts_author FOREIGN KEY (author_id) REFERENCES users (id),
  CONSTRAINT fk_posts_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS post_tags (
  post_id INT UNSIGNED NOT NULL,
  tag_id  INT UNSIGNED NOT NULL,
  PRIMARY KEY (post_id, tag_id),
  KEY idx_post_tags_tag (tag_id),
  CONSTRAINT fk_pt_post FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
  CONSTRAINT fk_pt_tag FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS media (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  url         VARCHAR(500) NOT NULL,
  filename    VARCHAR(255) NOT NULL,
  mime        VARCHAR(100) NOT NULL,
  size        INT UNSIGNED NOT NULL,
  alt         VARCHAR(255) NULL,
  uploaded_by INT UNSIGNED NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_media_user FOREIGN KEY (uploaded_by) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS subscribers (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email      VARCHAR(191) NOT NULL,
  active     TINYINT(1) NOT NULL DEFAULT 1,
  source     VARCHAR(100) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_subscribers_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_messages (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name       VARCHAR(120) NOT NULL,
  email      VARCHAR(191) NOT NULL,
  subject    VARCHAR(255) NULL,
  message    TEXT NOT NULL,
  is_read    TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS settings (
  `key`   VARCHAR(100) NOT NULL,
  `value` TEXT NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
