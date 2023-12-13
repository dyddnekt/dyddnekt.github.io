package www.dream.bbs.fileattachment.service;

import java.io.File;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import www.dream.bbs.fileattachment.model.dto.AttachFileDTO;
import www.dream.bbs.fileattachment.repository.AttachFileRepository;

@Service
@PropertySource("classpath:application.properties")
public class AttachFileCleaner {
	public static final char DATE_STRING_DELIMETER = ':';
	public static final SimpleDateFormat SDF = new SimpleDateFormat("yyyy:MM:dd");

	private String uploadDir = "c:-upload";

	@Autowired // SpEL
	public void setValues(@Value("#{'${upload.file.dir}'}") String value) {
		if (!ObjectUtils.isEmpty(value)) {
			this.uploadDir = value;
		}
		uploadDir = uploadDir.replace("-", File.separator); // 2023\09\19 이식성
	}

	@Autowired
	private AttachFileRepository attachFileRepository;

	public String getUploadDir() {
		return uploadDir;
	}

	@Scheduled(cron = "0 0 0 * * *")
	public void clearAttachFile() throws InterruptedException {
		System.out.println("clearAttachFile 실행 시작");
		// 실행되면 어제 첨부파일 정보 db에서 확보
		List<String> dur = getDuration();

		// path에서 모든 파일을 바탕으로 db에 등록되지 않은...
		// db에 등록되어 있는... 잘 관리 중인 첨부 정보들
		List<AttachFileDTO> listManaged = attachFileRepository.findByPathNameIn(dur);

		// path 만들기
		Set<File> listUploadedFiles = new HashSet<>();
		for (String aDay : dur) {
			String fullPath = uploadDir + File.separator
					+ aDay.replace(DATE_STRING_DELIMETER, File.separator.charAt(0));

			File[] arrFile = new File(fullPath).listFiles();
			if (arrFile != null)
				Stream.of(arrFile).filter(file -> !file.isDirectory()).forEach(file -> listUploadedFiles.add(file));
		}

		// 미아 상태의 파일에 대하여
		// 잘 관리 중인 첨부 파일 이름을
		Set<String> setManagedFileName = listManaged.stream().map(AttachFileDTO::pureFileName)
				.collect(Collectors.toSet());
		listManaged.stream().filter(AttachFileDTO::hasThumbnail).map(AttachFileDTO::thumbFileName)
				.forEach(fn -> setManagedFileName.add(fn));

		Set<File> lostedFile = listUploadedFiles.stream().filter(file -> !setManagedFileName.contains(file.getName()))
				.collect(Collectors.toSet());

		// 청소
		for (File f : lostedFile) {
			f.delete();
		}
	}

	private List<String> getDuration() {
		List<String> ret = new ArrayList<>();
		LocalDateTime cal = LocalDateTime.now();
		cal.minusDays(5); // 오늘날짜로부터 5일 전
		for (int i = 0; i < 4; i++) {
			cal.plusDays(1);
			Date date = java.sql.Timestamp.valueOf(cal);
			String aDay = SDF.format(date);
			ret.add(aDay);
		}
		return ret;
	}

	private String findFolder(String date) {
		return date.replace("-", File.separator);
	}
}
