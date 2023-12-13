--특정 테이블 레코드의 pk 값을 char(4)로 채우기 위하여 해당 시퀀스로부터 만들기
CREATE FUNCTION F_GET_PK(SEQ_No integer) RETURNS VARCHAR(4)
BEGIN
    DECLARE RTN_VAL VARCHAR(4);

    SELECT ID INTO RTN_VAL
    FROM T_ID_SEED
    WHERE NUM = SEQ_No
    LIMIT 1;

    RETURN RTN_VAL;
END;

SELECT  FUNCTION F_GET_PK(nextval(S_bulitine_board));




--시퀀스 정보를 가지고 있는 Sequence 테이블 만들기

CREATE TABLE t_sequence (
	NAME VARCHAR(255) PRIMARY KEY,
	num INT NOT NULL DEFAULT 0
);
INSERT INTO t_sequence (NAME) VALUES ('S_bulitine_board');



DELIMITER $$
CREATE OR REPLACE FUNCTION next_pk(t_NAME VARCHAR(255)) RETURNS CHAR(4)
BEGIN
	DECLARE unrecorded boolean;
	DECLARE r_sequence CHAR(4);
	
	select not exists(select num from t_sequence where name = t_NAME) into unrecorded;
	
	if (unrecorded) then
		INSERT INTO t_sequence (NAME) VALUES (t_NAME);
	end if;
		
	UPDATE T_SEQUENCE SET NUM = NUM + 1  WHERE NAME = T_NAME;
	
	SELECT c.ID INTO R_SEQUENCE
	  FROM t_sequence s, T_ID_SEED c
	 WHERE s.NAME = T_NAME
	   AND s.NUM = c.NUM;
	
	RETURN r_sequence;
END;
$$
DELIMITER ;

SELECT NEXT_pk('S_bulitine_board');




CREATE TABLE t_sequence (
	NAME VARCHAR(255) PRIMARY KEY,
	num INT NOT NULL DEFAULT 0
);
INSERT INTO t_sequence (NAME) VALUES ('S_bulitine_board');

select exists(select num from t_sequence where name = 'S_bulitine_board');




DELIMITER $$
CREATE FUNCTION fn_get_sequence(p_seq_name VARCHAR(255)) RETURNS varchar(4)
BEGIN
	DECLARE r_sequence_no INT;
	RETURN NULL;
END;
$$
DELIMITER;