package www.dream.bbs.party.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.dream.bbs.party.model.Person4PartyVO;
import www.dream.bbs.party.model.TmdbCompanyVO;


@Mapper		//Container에 담기도록 지정
public interface Movie4PartyMapper {
	//Party 쿼리에 들어가는 영화 제작사 정보.
	public int listAllComp(List<TmdbCompanyVO> movie4pList);
	
	//Party 쿼리에 들어가는 영화 관계자들 정보.
	public int insertAllActor(List<Person4PartyVO> actorLists);

	public List<String> findExistings(List<String> listIdString, String descrim);

}
