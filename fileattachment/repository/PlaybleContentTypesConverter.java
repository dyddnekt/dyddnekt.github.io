package www.dream.bbs.fileattachment.repository;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import www.dream.bbs.fileattachment.model.PlaybleContentTypes;

@Converter(autoApply = true)
public class PlaybleContentTypesConverter implements AttributeConverter<PlaybleContentTypes, String> {
    @Override
    public String convertToDatabaseColumn(PlaybleContentTypes playbleContentTypes) {
        if (playbleContentTypes == null) {
            return null;
        }
        return playbleContentTypes.toString();
    }

    @Override
    public PlaybleContentTypes convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }

        return Stream.of(PlaybleContentTypes.values())
          .filter(c -> c.toString().equals(code))
          .findFirst()
          .orElseThrow(IllegalArgumentException::new);
    }
}
