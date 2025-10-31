-- Configuración inicial
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
-- Tipo ENUM
CREATE TYPE public.tipo_transaccion_enum AS ENUM (
    'entrega',
    'evento',
    'canje'
);
ALTER TYPE public.tipo_transaccion_enum OWNER TO admin;

-- Tabla: contenedores
CREATE TABLE public.contenedores (
    id_contenedor integer NOT NULL,
    latitud numeric(9,6) NOT NULL,
    longitud numeric(9,6) NOT NULL,
    materiales_aceptados character varying(255) NOT NULL,
    dias_horarios_recoleccion text
);
ALTER TABLE public.contenedores OWNER TO admin;

CREATE SEQUENCE public.contenedores_id_contenedor_seq
    AS integer START WITH 1 INCREMENT BY 1 CACHE 1;
ALTER SEQUENCE public.contenedores_id_contenedor_seq OWNER TO admin;
ALTER SEQUENCE public.contenedores_id_contenedor_seq OWNED BY public.contenedores.id_contenedor;
ALTER TABLE ONLY public.contenedores ALTER COLUMN id_contenedor SET DEFAULT nextval('public.contenedores_id_contenedor_seq'::regclass);
ALTER TABLE ONLY public.contenedores ADD CONSTRAINT contenedores_pkey PRIMARY KEY (id_contenedor);

-- Tabla: eventos_ambientales
CREATE TABLE public.eventos_ambientales (
    id_evento integer NOT NULL,
    nombre text NOT NULL,
    descripcion text,
    fecha timestamp without time zone NOT NULL,
    ubicacion text,
    puntos_otorgados integer
);
ALTER TABLE public.eventos_ambientales OWNER TO admin;

CREATE SEQUENCE public.eventos_ambientales_id_evento_seq
    AS integer START WITH 1 INCREMENT BY 1 CACHE 1;
ALTER SEQUENCE public.eventos_ambientales_id_evento_seq OWNER TO admin;
ALTER SEQUENCE public.eventos_ambientales_id_evento_seq OWNED BY public.eventos_ambientales.id_evento;
ALTER TABLE ONLY public.eventos_ambientales ALTER COLUMN id_evento SET DEFAULT nextval('public.eventos_ambientales_id_evento_seq'::regclass);
ALTER TABLE ONLY public.eventos_ambientales ADD CONSTRAINT eventos_ambientales_pkey PRIMARY KEY (id_evento);

-- Tabla: puntos_ecologicos
CREATE TABLE public.puntos_ecologicos (
    id_transaccion integer NOT NULL,
    id_usuario integer NOT NULL,
    tipo_transaccion public.tipo_transaccion_enum NOT NULL,
    puntos integer NOT NULL,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_referencia integer
);
ALTER TABLE public.puntos_ecologicos OWNER TO admin;
COMMENT ON COLUMN public.puntos_ecologicos.id_referencia IS 'ID de la tabla relacionada (ej. canje, evento)';

CREATE SEQUENCE public.puntos_ecologicos_id_transaccion_seq
    AS integer START WITH 1 INCREMENT BY 1 CACHE 1;
ALTER SEQUENCE public.puntos_ecologicos_id_transaccion_seq OWNER TO admin;
ALTER SEQUENCE public.puntos_ecologicos_id_transaccion_seq OWNED BY public.puntos_ecologicos.id_transaccion;
ALTER TABLE ONLY public.puntos_ecologicos ALTER COLUMN id_transaccion SET DEFAULT nextval('public.puntos_ecologicos_id_transaccion_seq'::regclass);
ALTER TABLE ONLY public.puntos_ecologicos ADD CONSTRAINT puntos_ecologicos_pkey PRIMARY KEY (id_transaccion);

-- Tabla: usuarios
CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre text NOT NULL,
    email text NOT NULL,
    "contraseña" text NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE public.usuarios OWNER TO admin;

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer START WITH 1 INCREMENT BY 1 CACHE 1;
ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO admin;
ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;
ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);
ALTER TABLE ONLY public.usuarios ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);
ALTER TABLE ONLY public.usuarios ADD CONSTRAINT usuarios_email_key UNIQUE (email);

-- Relaciones
ALTER TABLE ONLY public.puntos_ecologicos
    ADD CONSTRAINT puntos_ecologicos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);