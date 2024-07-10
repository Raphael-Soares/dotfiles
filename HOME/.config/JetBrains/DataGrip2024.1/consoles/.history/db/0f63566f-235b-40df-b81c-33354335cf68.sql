SELECT SYSDATE FROM DATE;
;-- -. . -..- - / . -. - .-. -.--
create database alura_series;
;-- -. . -..- - / . -. - .-. -.--
select * from alura_series.series;
;-- -. . -..- - / . -. - .-. -.--
select * from episodios;
;-- -. . -..- - / . -. - .-. -.--
delete * from episodios where 1 = 1;
;-- -. . -..- - / . -. - .-. -.--
delete from episodios;
;-- -. . -..- - / . -. - .-. -.--
delete * from episodios;
;-- -. . -..- - / . -. - .-. -.--
DELETE FROM alura_series.public.episodios;
;-- -. . -..- - / . -. - .-. -.--
DELETE FROM episodios;
;-- -. . -..- - / . -. - .-. -.--
select * from series;
;-- -. . -..- - / . -. - .-. -.--
SELECT * FROM series WHERE series.total_temporadas <= 5 AND  series.avaliacao >= 7.5;
;-- -. . -..- - / . -. - .-. -.--
create database screensound_db;