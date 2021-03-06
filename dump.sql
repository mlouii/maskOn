PGDMP                         x           postgres     12.2 (Ubuntu 12.2-2.pgdg18.04+1)     12.2 (Ubuntu 12.2-2.pgdg18.04+1) %    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    13432    postgres    DATABASE     z   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE postgres;
                postgres    false            �           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3006            �            1259    16502    address    TABLE     J  CREATE TABLE public.address (
    addressid character varying(15) NOT NULL,
    address1 character varying(10),
    address2 character varying(10),
    city character varying(10),
    state character varying(10),
    zipcode integer,
    userid character varying(20),
    CONSTRAINT address_zipcode_check CHECK ((zipcode > 0))
);
    DROP TABLE public.address;
       public         heap    postgres    false            �           0    0    TABLE address    ACL     =   GRANT SELECT,UPDATE ON TABLE public.address TO customerrole;
          public          postgres    false    202            �            1259    16506    customer    TABLE     C  CREATE TABLE public.customer (
    customerid character varying(20) NOT NULL,
    lastname character varying(15) NOT NULL,
    middlename character varying(15),
    firstname character varying(15) NOT NULL,
    addressid character varying(20),
    emailaddress character varying(25),
    "phoneNumber" character varying
);
    DROP TABLE public.customer;
       public         heap    postgres    false            �           0    0    TABLE customer    ACL     t   GRANT SELECT,UPDATE ON TABLE public.customer TO customerrole;
GRANT ALL ON TABLE public.customer TO superadminrole;
          public          postgres    false    203            �            1259    16510    employee    TABLE     �  CREATE TABLE public.employee (
    employeeid character varying(10) NOT NULL,
    ssn integer,
    lastname character varying(15) NOT NULL,
    middlename character varying(15),
    firstname character varying(15) NOT NULL,
    sex character(1),
    dob date,
    salary numeric(19,4),
    typeofpay character varying(15),
    jobtype character varying(20),
    jobtitle character varying(20),
    CONSTRAINT employee_salary_check CHECK ((salary > (0)::numeric))
);
    DROP TABLE public.employee;
       public         heap    postgres    false            �           0    0    TABLE employee    ACL     6   GRANT ALL ON TABLE public.employee TO superadminrole;
          public          postgres    false    204            �            1259    16514 	   inventory    TABLE     �  CREATE TABLE public.inventory (
    inventoryid character varying(10) NOT NULL,
    cost character varying(30),
    leadtime character varying(30),
    categorytype character varying(10) NOT NULL,
    categorynumber integer NOT NULL,
    availableinventory integer,
    modelnumber character varying,
    CONSTRAINT inventory_availableinventory_check CHECK (((availableinventory)::numeric > (0)::numeric)),
    CONSTRAINT inventory_cost_check CHECK (((cost)::numeric > (0)::numeric))
);
    DROP TABLE public.inventory;
       public         heap    postgres    false            �           0    0    TABLE inventory    ACL     l   GRANT ALL ON TABLE public.inventory TO employeerole;
GRANT ALL ON TABLE public.inventory TO superadminrole;
          public          postgres    false    205            �            1259    16519    login    TABLE     �   CREATE TABLE public.login (
    userid character varying(20) NOT NULL,
    privilege character varying(15) NOT NULL,
    logintime character varying(20),
    logouttime character varying(20),
    password character varying(20)
);
    DROP TABLE public.login;
       public         heap    postgres    false            �           0    0    TABLE login    ACL     �   GRANT SELECT ON TABLE public.login TO customerrole;
GRANT SELECT ON TABLE public.login TO employeerole;
GRANT ALL ON TABLE public.login TO superadminrole;
          public          postgres    false    206            �            1259    16522    model    TABLE     P  CREATE TABLE public.model (
    saleprice integer,
    manufactureddate character varying(30),
    "imageUrl" character varying NOT NULL,
    description character varying,
    modeltype character varying,
    modelnumber character varying NOT NULL,
    CONSTRAINT model_saleprice_check CHECK (((saleprice)::numeric > (0)::numeric))
);
    DROP TABLE public.model;
       public         heap    postgres    false            �           0    0    TABLE model    ACL     3   GRANT ALL ON TABLE public.model TO superadminrole;
          public          postgres    false    207            �            1259    16526    orders    TABLE     �  CREATE TABLE public.orders (
    ordernumber character varying(10) NOT NULL,
    customerid character varying(20) NOT NULL,
    employeeid character varying(10) NOT NULL,
    modelnumber integer,
    salevalue integer,
    quantity integer,
    timedate character varying(20),
    "pertainingTo" character varying,
    CONSTRAINT orders_quantity_check CHECK (((quantity)::numeric > (0)::numeric)),
    CONSTRAINT orders_salevalue_check CHECK (((salevalue)::numeric > (0)::numeric))
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �           0    0    TABLE orders    ACL     f   GRANT ALL ON TABLE public.orders TO employeerole;
GRANT ALL ON TABLE public.orders TO superadminrole;
          public          postgres    false    208            �            1259    16572    modelbought    VIEW     k   CREATE VIEW public.modelbought AS
 SELECT orders.modelnumber,
    orders.customerid
   FROM public.orders;
    DROP VIEW public.modelbought;
       public          postgres    false    208    208            �            1259    16580    partsandinventory    VIEW     �   CREATE VIEW public.partsandinventory AS
 SELECT orders.modelnumber,
    inventory.availableinventory
   FROM (public.orders
     JOIN public.inventory ON ((((orders.modelnumber)::character varying)::text = (inventory.modelnumber)::text)));
 $   DROP VIEW public.partsandinventory;
       public          postgres    false    205    205    208            �            1259    16576    totalrevenue    VIEW     �   CREATE VIEW public.totalrevenue AS
 SELECT sum(orders.salevalue) AS sum,
    orders.customerid
   FROM public.orders
  GROUP BY orders.customerid;
    DROP VIEW public.totalrevenue;
       public          postgres    false    208    208            �            1259    16568    viewexpensereport    VIEW     e   CREATE VIEW public.viewexpensereport AS
 SELECT sum(employee.salary) AS sum
   FROM public.employee;
 $   DROP VIEW public.viewexpensereport;
       public          postgres    false    204            �          0    16502    address 
   TABLE DATA           ^   COPY public.address (addressid, address1, address2, city, state, zipcode, userid) FROM stdin;
    public          postgres    false    202   �-       �          0    16506    customer 
   TABLE DATA           w   COPY public.customer (customerid, lastname, middlename, firstname, addressid, emailaddress, "phoneNumber") FROM stdin;
    public          postgres    false    203   �-       �          0    16510    employee 
   TABLE DATA           �   COPY public.employee (employeeid, ssn, lastname, middlename, firstname, sex, dob, salary, typeofpay, jobtype, jobtitle) FROM stdin;
    public          postgres    false    204   ?.       �          0    16514 	   inventory 
   TABLE DATA              COPY public.inventory (inventoryid, cost, leadtime, categorytype, categorynumber, availableinventory, modelnumber) FROM stdin;
    public          postgres    false    205   \.       �          0    16519    login 
   TABLE DATA           S   COPY public.login (userid, privilege, logintime, logouttime, password) FROM stdin;
    public          postgres    false    206   �.       �          0    16522    model 
   TABLE DATA           m   COPY public.model (saleprice, manufactureddate, "imageUrl", description, modeltype, modelnumber) FROM stdin;
    public          postgres    false    207   �.       �          0    16526    orders 
   TABLE DATA           �   COPY public.orders (ordernumber, customerid, employeeid, modelnumber, salevalue, quantity, timedate, "pertainingTo") FROM stdin;
    public          postgres    false    208   �0       #           2606    16532    address address_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (addressid);
 >   ALTER TABLE ONLY public.address DROP CONSTRAINT address_pkey;
       public            postgres    false    202            %           2606    16534    customer customer_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customerid);
 @   ALTER TABLE ONLY public.customer DROP CONSTRAINT customer_pkey;
       public            postgres    false    203            '           2606    16536    employee employee_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (employeeid);
 @   ALTER TABLE ONLY public.employee DROP CONSTRAINT employee_pkey;
       public            postgres    false    204            )           2606    16538    inventory inventory_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (inventoryid);
 B   ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_pkey;
       public            postgres    false    205            +           2606    16540    login login_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (userid);
 :   ALTER TABLE ONLY public.login DROP CONSTRAINT login_pkey;
       public            postgres    false    206            -           2606    16557    model model_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.model
    ADD CONSTRAINT model_pkey PRIMARY KEY (modelnumber);
 :   ALTER TABLE ONLY public.model DROP CONSTRAINT model_pkey;
       public            postgres    false    207            /           2606    16544    orders orders_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (ordernumber);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    208            �   3   x�3�4T�K�MU(.��T��I�K)�/�����43060�,I-.����� ��
�      �   9   x�3���/����M,��4����/u�H,����,�KM)�436P026a#�=... ��u      �      x������ � �      �   W   x�m�;
�@�z�0��.�Ylmm������@�cB:
滛
�y��;*9�J��>����m��kz��V�����������
�      �       x�+I-.�L�40�20 "��Ș+F��� ���      �   �  x�}�1o�0�g�W�w���x�T�� H CP�˙:I�(R!ON�_��d�b@���>~Ok��n�W+y�֗�)��=&k0��o_�ޡ�\	!��c������O�AM�K`���a`�#�@�Q7�bs���n�S�K�#7��9L�Sp�r�hq	�Di	c�cG`��mx˟.'���i�����z�����ުX���Wc���̃i%D�!1�,�Y������ي����Li�Ik�����鄰.V��9BP�%���'�*2l�Њ���y�y+��!�}9����Cd����RZ�]�8�\�gq�?���r�d�<x�fCU���}e�=��Ik�v|�9����w��W����p��Bh��ni�����]��y�E�L�\�%i�-dF�3�l���i�WO��#ۦ����� 

n      �   |   x�s7w�
��,I-.�412bNN �od�od 䙙[�Zp��eVD!�3�4�4DRg$-��,����q�b*,/��p�BVhȉ�����Ĝ+7��ҷY�ZLu�.�ii�<Q���� ��4!     