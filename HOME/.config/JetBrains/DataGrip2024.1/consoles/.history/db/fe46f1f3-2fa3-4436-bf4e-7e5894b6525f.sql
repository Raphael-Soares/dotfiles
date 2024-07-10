drop table medicos;
;-- -. . -..- - / . -. - .-. -.--
alter table medicos drop telefone;
;-- -. . -..- - / . -. - .-. -.--
delete from flyway_schema_history where success = 0;
;-- -. . -..- - / . -. - .-. -.--
drop database vollmed_api;
;-- -. . -..- - / . -. - .-. -.--
drop database vollmed;
;-- -. . -..- - / . -. - .-. -.--
create database vollmed;