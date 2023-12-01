package www.dream.bbs.fileattachment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import www.dream.bbs.fileattachment.model.dto.AttachFileDTO;

public interface AttachFileRepository extends JpaRepository<AttachFileDTO, String> {
	/** list up 
	 * select *
	 * from t_attach
	 * where ownerType = #{ownerType}
	 * and ownerId = #{ownerId} 
	 * */
	List<AttachFileDTO> findByOwnerTypeAndOwnerId(String ownerType, String ownerId);

	/** SELECT *
	 * FROM t_attach
	 * WHERE PATH IN ('2023:09:25', '2023:09:26');
	 * */
	List<AttachFileDTO> findByPathNameIn(List<String> listDay);

	/** create */
//	@Query(nativeQuery = true, value = "insert into t_attach(owner_type, owner_id, uuid, path, name, type_name)"
//			+ "values(:obj.ownerType, :obj.ownerId, :obj.uuid, :obj.uploadPath, :obj.originalFilePureName, :obj.typeName)")
//	List<TagVO> saveAttachFileDTO(@Param("obj") AttachFileDTO obj);

	/** delete one */
	/** delete all */
	int deleteAllByOwnerTypeAndOwnerId(String ownerType, String ownerId);
}
