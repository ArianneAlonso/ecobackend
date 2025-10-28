--
-- PostgreSQL database dump
--

\restrict g3dnG8LxCTozqva16BdNRnxZnzhhdN3Vx0n8QaEEM76yemTYgG2vlQVHbAmK4ZN

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

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

--
-- Name: tipo_transaccion_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tipo_transaccion_enum AS ENUM (
    'entrega',
    'evento',
    'canje'
);


ALTER TYPE public.tipo_transaccion_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contenedores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contenedores (
    id_contenedor integer NOT NULL,
    latitud numeric(9,6) NOT NULL,
    longitud numeric(9,6) NOT NULL,
    materiales_aceptados character varying(255) NOT NULL,
    dias_horarios_recoleccion text
);


ALTER TABLE public.contenedores OWNER TO postgres;

--
-- Name: contenedores_id_contenedor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contenedores_id_contenedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contenedores_id_contenedor_seq OWNER TO postgres;

--
-- Name: contenedores_id_contenedor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contenedores_id_contenedor_seq OWNED BY public.contenedores.id_contenedor;


--
-- Name: eventos_ambientales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.eventos_ambientales (
    id_evento integer NOT NULL,
    nombre text NOT NULL,
    descripcion text,
    fecha timestamp without time zone NOT NULL,
    ubicacion text,
    puntos_otorgados integer
);


ALTER TABLE public.eventos_ambientales OWNER TO postgres;

--
-- Name: eventos_ambientales_id_evento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.eventos_ambientales_id_evento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.eventos_ambientales_id_evento_seq OWNER TO postgres;

--
-- Name: eventos_ambientales_id_evento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.eventos_ambientales_id_evento_seq OWNED BY public.eventos_ambientales.id_evento;


--
-- Name: puntos_ecologicos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.puntos_ecologicos (
    id_transaccion integer NOT NULL,
    id_usuario integer NOT NULL,
    tipo_transaccion public.tipo_transaccion_enum NOT NULL,
    puntos integer NOT NULL,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_referencia integer
);


ALTER TABLE public.puntos_ecologicos OWNER TO postgres;

--
-- Name: COLUMN puntos_ecologicos.id_referencia; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.puntos_ecologicos.id_referencia IS 'ID de la tabla relacionada (ej. canje, evento)';


--
-- Name: puntos_ecologicos_id_transaccion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.puntos_ecologicos_id_transaccion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.puntos_ecologicos_id_transaccion_seq OWNER TO postgres;

--
-- Name: puntos_ecologicos_id_transaccion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.puntos_ecologicos_id_transaccion_seq OWNED BY public.puntos_ecologicos.id_transaccion;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre text NOT NULL,
    email text NOT NULL,
    "contraseña" text NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- Name: contenedores id_contenedor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenedores ALTER COLUMN id_contenedor SET DEFAULT nextval('public.contenedores_id_contenedor_seq'::regclass);


--
-- Name: eventos_ambientales id_evento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventos_ambientales ALTER COLUMN id_evento SET DEFAULT nextval('public.eventos_ambientales_id_evento_seq'::regclass);


--
-- Name: puntos_ecologicos id_transaccion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puntos_ecologicos ALTER COLUMN id_transaccion SET DEFAULT nextval('public.puntos_ecologicos_id_transaccion_seq'::regclass);


--
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- Data for Name: contenedores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contenedores (id_contenedor, latitud, longitud, materiales_aceptados, dias_horarios_recoleccion) FROM stdin;
\.


--
-- Data for Name: eventos_ambientales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.eventos_ambientales (id_evento, nombre, descripcion, fecha, ubicacion, puntos_otorgados) FROM stdin;
\.


--
-- Data for Name: puntos_ecologicos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.puntos_ecologicos (id_transaccion, id_usuario, tipo_transaccion, puntos, fecha, id_referencia) FROM stdin;
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, nombre, email, "contraseña", fecha_registro) FROM stdin;
\.


--
-- Name: contenedores_id_contenedor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contenedores_id_contenedor_seq', 1, false);


--
-- Name: eventos_ambientales_id_evento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.eventos_ambientales_id_evento_seq', 1, false);


--
-- Name: puntos_ecologicos_id_transaccion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.puntos_ecologicos_id_transaccion_seq', 1, false);


--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 1, false);


--
-- Name: contenedores contenedores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenedores
    ADD CONSTRAINT contenedores_pkey PRIMARY KEY (id_contenedor);


--
-- Name: eventos_ambientales eventos_ambientales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventos_ambientales
    ADD CONSTRAINT eventos_ambientales_pkey PRIMARY KEY (id_evento);


--
-- Name: puntos_ecologicos puntos_ecologicos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puntos_ecologicos
    ADD CONSTRAINT puntos_ecologicos_pkey PRIMARY KEY (id_transaccion);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- Name: puntos_ecologicos puntos_ecologicos_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puntos_ecologicos
    ADD CONSTRAINT puntos_ecologicos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


--
-- PostgreSQL database dump complete
--

\unrestrict g3dnG8LxCTozqva16BdNRnxZnzhhdN3Vx0n8QaEEM76yemTYgG2vlQVHbAmK4ZN

