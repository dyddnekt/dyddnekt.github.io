drop table T_attach;
drop table T_comp_hierarch;
drop table T_tgt_tag;
drop table T_tag;
drop table T_reply;
drop table T_party;
drop table T_bulitine_board;
drop table T_CODE;



drop table T_user;
drop table T_report;
drop table T_recent_movie;

--id, account_type, name, nick, pwd, birth, sex	, address, email, membership, penalty, active
create table T_user(
	id				char(4) primary key,
	account_type 	varchar(255) not null comment 'member, manager',
	name			varchar(255) not null,
	nick			varchar(255) not null comment 'login id 용도, 회원탈퇴시 더미아이디로 변경',
	pwd				varchar(255) not null,
	birth			date not null comment '연령확인용 생년월일',
	sex				boolean not null comment '여자는 1, 남자는 0',
	address			varchar(255) not null comment '지역(구)',
	email			varchar(255) not null comment '인증용 이메일',
	membership		date not null default '1900-01-01' comment '멤버쉽만료일. 도달시 멤버쉽종료',
	penalty			int not null default 0 comment '벌점 (5점 도달시 댓글영구금지)',
	active			boolean not null default 1 comment '기본 1, 탈퇴시 0으로 변경, 일정기간안에 복귀하면 다시 1로, 시간초과시 정보완전삭제'
);

--reply_id, reporter_id, reported_id, content, checked
create table T_report(
	reply_id		char(8) not null,
	reporter_id		char(4) not null,
	reported_id		char(4) not null,
	content			TEXT(65000) not null,
	checked			boolean not null default 0 comment '기본 0, 처리후 1로 변경',
 	primary key(reply_id, reporter_id)
);

--user_id, movie_id, title, movie_runtime, view_time, reg_dt, upt_dt
create table T_recent_movie(
	user_id			char(4) not null,
	movie_id		char(4) not null,
	title			varchar(255),
	movie_runtime	int not null default 0 comment '동영상의 총 시간(밀리초단위) 1시간=3600000밀리초',
	view_time		int not null default 0 comment '동영상을 보는데에 사용한 시간(밀리초단위) 동영상 이하를 유지',
	reg_dt			TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	upt_dt			TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 	primary key(user_id, movie_id)
);


--id, descrim, name, gender, nick, pwd, reg_dt, upt_dt, birth, address, email, membership, penalty, active
create table T_party(
	id			char(4),
	descrim 	varchar(255) not null comment 'person, producer, organization, member, manager',
	name		varchar(255) not null,
	/* 사람 전용 */
	gender		int comment '사람 전용. 미지정은 0, 여자는 1, 남자는 2, 논바이너리는 3',
	/* if descrim != user */
	image		varchar(500),
	/* if descrim = user */
	nick		varchar(255) comment 'login id 용도',
	pwd			varchar(255),
	birth		date comment '연령확인용 생년월일',
	address		varchar(255) comment '지역(구)',
	email		varchar(255) comment '인증용 이메일',
	membership	date default '1900-01-01' comment '멤버쉽만료일. 도달시 멤버쉽종료',
	penalty		int default 0 comment '벌점 (5점 도달시 댓글영구금지)',
	active		boolean default 1 comment '기본 1, 탈퇴시 0으로 변경, 일정기간안에 복귀하면 다시 1로, 시간초과시 정보완전삭제',
	reg_dt		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	upt_dt		TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 	primary key(id, descrim)
);








--id, name, descrip, post_cnt
create table T_bulitine_board(
	id			char(4) primary key,
	name		varchar(255) not null,
	descrip		varchar(255),
	post_cnt	long default 0 comment '총 게시물 수'
);

insert into T_bulitine_board(id, name, descrip)
values(NEXT_PK('S_bulitine_board'), '자유게시판', '형식없이 자유롭게 글을 쓰는 곳입니다');

--id, descrim, name, nick, pwd, alive, reg_dt, upt_dt, sex
create table T_party(
	id		char(4) primary key,
	descrim varchar(255) not null comment 'Person, Organization',
	name	varchar(255) not null,
	nick	varchar(255) not null comment 'login id 용도',
	pwd		varchar(255) not null,
	reg_dt	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	upt_dt	TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	/* if descrim = Person */
	sex		boolean comment '여자는 1, 남자는 0'
);
--로그인시 비교 대상인 암호까지 index에서 제공하여 table에 대한 접근을 방어하여 성능을 높임
drop index idx_party_nick on T_party;
create index idx_party_nick on T_party(nick);

	values('????', 'Organization', 'Dream Company', 'sys', 암호화하여 'sys');

--id, account_type, owner_id, response_id, alive, reg_dt, upt_dt
create table T_Accountability(
	id				char(4) primary key,
	account_type	varchar(255) comment 'Manager, Member',
	owner_id		char(4) comment '주인으로서',
	response_id		char(4) comment '대상으로서',
	alive			boolean DEFAULT true comment '활성 여부',
	reg_dt			TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '등록일',
	upt_dt			TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '최종 정보 수정일'
);

/* 코드 유형 정의 */
create table T_CODE(
	code_type		varchar(255) not null,
	code_val		varchar(255),
	validation_re 	varchar(255)
);
insert into T_CODE(code_type, code_val) values('accountability type', 'manager');
insert into T_CODE(code_type, code_val) values('accountability type', 'member');

insert into T_CODE(code_type, code_val) values('contact point type', 'hand phone number');
insert into T_CODE(code_type, code_val) values('contact point type', 'home address');
insert into T_CODE(code_type, code_val, validation_re) values('contact point type', 'email', '[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

insert into T_CODE(code_type, code_val) values('rel target tag', 'post');
insert into T_CODE(code_type, code_val) values('rel target tag', 'party');

--T_contact_point(owner_id, cp_type, cp_val)
create table T_contact_point(
	owner_id	char(4),
	cp_type		varchar(255),
	cp_val		varchar(255),
 primary key(owner_id, cp_type)
);

--id, descrim, writer_id, title, content, bb_id, movie_id, genre, age_limit, star_score, read_cnt, reg_dt, upt_dt
create table T_reply(
	id			varchar(255) primary key,
	descrim 	varchar(255) not null comment 'reply, post 구분자',
	writer_id	char(4) comment '글쓴아이디',
	TITLE		varchar(255),
	content 	TEXT(65000),
	bb_id 		char(4) comment '상단 메뉴바 번호',
	movie_id	int,
	genre		varchar(255) comment '장르 액션/무협 , 모험 , 판타지 , 공상 , 과학(SF) , 누아르, 전쟁, 코미디',
	age_limit	char(2) comment '나이제한 All 0, 12세 1, 15세 2, 18세이상 3',
	star_score	float default 0 comment '별점 0.5 ~ 5.0',
	read_cnt	int default 0 comment '조회수',
	reg_dt  	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	upt_dt  	TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
create index idx_post_board on T_reply(bb_id);
create index idx_post_movie on T_reply(movie_id);

--id, word, description, df
--통합 검색 체계
create table T_tag(
	id			char(4) primary key,
	word		varchar(255),
	description	TEXT(65000),
	df			long
);

--tgt_name, tgt_id, tag_id, tf
create table T_tgt_tag(
	tgt_name	varchar(255) comment 'post, party',
	tgt_id		char(4),
	tag_id		char(4),
	tf			int,
	primary key(tgt_name, tag_id, tgt_id) /* post */
);
/* party */
create index idx_tgt_tag on T_tgt_tag(tgt_name, tgt_id, tag_id);

/* top2bottom bottom2top */
create table T_comp_hierarch(
	id				char(4) primary key,
	comp_hierarch	varchar(255),
	kind			char(3) /* t2b, b2t */
);
create index idx_comp_hier on T_comp_hierarch(comp_hierarch);

insert into t_attach(owner_type, owner_id, uuid, path, name, type_name)
values();
--owner_type, owner_id, uuid, path, name, type_ordinal
create table T_attach(
	owner_type	varchar(255) comment '테이블 이름 적는 곳 T_party, T_reply',
	owner_id	varchar(255),
	uuid		char(32),
	path		char(10),
	name		varchar(500),
	type_name	varchar(100),
	primary	key	(uuid)
);
create index idx_attach_owner on T_attach(owner_id);
create index idx_attach_path on T_attach(path);

--	rtyu, 'post'
--	r000, 'post'
--	rtyu, op09, 'reply'
--	op09, 1111, 'reply'
--	op09, kkkk, 'reply'
--
--	rtyu, rtyu
--	r000, r000
--	op09, rtyuop09
--	1111, rtyuop091111
--	kkkk, rtyuop09kkkk


/* 영화 DB에서 받아오는 정보들 */
create table T_tmdb_movie(
			adult 	boolean,
		   	  id	Integer,
	  genre_names	varchar(255),		   	  
		   title	varchar(255),
	  popularity	varchar(255),
    release_date	varchar(255),
  		overview	TEXT(65000),
	vote_average	varchar(255),
	  vote_count	Integer
);

create index idx_movie_id on T_tmdb_movie(id);
drop index idx_movie_id on T_tmdb_movie;

/* 영화 장르들 자체 ID정보 저장 // 새 장르 나오면 추가하기 쉽게 */
create table T_movie_genre(
		id	Integer primary key, 
	  name	varchar(255)
);

INSERT INTO T_movie_genre(id, name)
	VALUES 
	(28, "액션"), (12, "모험"), (16, "애니메이션"), (35, "코미디"),
	(80, "범죄"), (99, "다큐멘터리"), (18, "드라마"), (10751, "가족"),
	(14, "판타지"), (36, "역사"), (27, "공포"), (10402, "음악"),
	(9648, "미스터리"), (10749, "로맨스"), (878, "SF"),
	(10770, "TV 영화"), (53, "스릴러"), (10752, "전쟁"), (37, "서부");

create table T_tmdb_img(
	   	  id	Integer,
	   title	varchar(255),
   file_path	varchar(255), 
	   width	Double,
	  height	Double,
aspect_ratio	Double
);

