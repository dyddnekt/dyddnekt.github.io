package www.dream.bbs.fileattachment.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import www.dream.bbs.fileattachment.model.PlaybleContentTypes;
import www.dream.bbs.fileattachment.model.dto.AttachFileDTO;
import www.dream.bbs.fileattachment.service.AttachFileCleaner;
import www.dream.bbs.framework.exception.BusinessException;
import www.dream.bbs.party.model.User4PartyVO;

@RestController // Container에 담기도록 지정
@RequestMapping("/attach")
public class AttachFileController {
	@Autowired
	private AttachFileCleaner attachFileCleaner;

	/**
	 * 게시글 등록 이전에 미리 첨부파일 전송의 목적은? 무거운 것 미리 올려두자
	 */
	@PostMapping("/upload_multi")
	public ResponseEntity<List<AttachFileDTO>> uploadAttachedMultiFiles(@AuthenticationPrincipal User4PartyVO user,
			@RequestParam MultipartFile[] attachFiles) throws BusinessException {
		List<AttachFileDTO> listRet = new ArrayList<>();

		String pathName = getFolder();
		String subPath = pathName.replace(AttachFileCleaner.DATE_STRING_DELIMETER, File.separator.charAt(0));
		File uploadPath = new File(attachFileCleaner.getUploadDir(), subPath);
		if (!uploadPath.exists()) {
			uploadPath.mkdirs(); // 여러 계층의 Folder를 한번에 만들기
		}

		for (MultipartFile aFile : attachFiles) {
			String originalFilename = Normalizer.normalize(aFile.getOriginalFilename(), Normalizer.Form.NFC);
			// a:\c\b\aa.txt => aa.txt
			String originalFilePureName = originalFilename.substring(originalFilename.lastIndexOf(File.separator) + 1);
			String uuid = UUID.randomUUID().toString().replace("-", "");

			AttachFileDTO attachFileDTO = new AttachFileDTO(pathName, originalFilePureName, uuid);

			File savedOnServerFile = attachFileDTO.findUploadedFile(attachFileCleaner.getUploadDir());
			PlaybleContentTypes contentType = null;
			try {
				aFile.transferTo(savedOnServerFile);
				InputStream inputStream = new FileInputStream(savedOnServerFile);
				contentType = PlaybleContentTypes.createThumbnail(inputStream, savedOnServerFile,
						attachFileCleaner.getUploadDir(), attachFileDTO);
				attachFileDTO.setContentType(contentType);
				inputStream.close();
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
			}
			listRet.add(attachFileDTO);
		}
		return new ResponseEntity<>(listRet, HttpStatus.OK);
	}

	/** 썸네일 파일을 화면에 조그맣게 표현해 줄때 작동 */
	@PostMapping("/anonymous/displayThumbnail")
	@ResponseBody
	public ResponseEntity<byte[]> getFile(@RequestBody AttachFileDTO afdto) {
		ResponseEntity<byte[]> result = null;
		try {
			File file = afdto.findThumnailFile(attachFileCleaner.getUploadDir());
			HttpHeaders header = new HttpHeaders();
			header.add("Content-Type", Files.probeContentType(file.toPath()));
			result = new ResponseEntity<>(FileCopyUtils.copyToByteArray(file), header, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@PostMapping("/anonymous/getOriginalFile")
	@ResponseBody
	public ResponseEntity<byte[]> getOriginalFile(@RequestBody AttachFileDTO afdto) {
		ResponseEntity<byte[]> result = null;
		try {
			File file = afdto.findUploadedFile(attachFileCleaner.getUploadDir());
			HttpHeaders header = new HttpHeaders();
			header.add("Content-Type", Files.probeContentType(file.toPath()));
			result = new ResponseEntity<>(FileCopyUtils.copyToByteArray(file), header, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	private String getFolder() {
		Date date = new Date();
		return AttachFileCleaner.SDF.format(date); // 2023:09:19
	}
}
