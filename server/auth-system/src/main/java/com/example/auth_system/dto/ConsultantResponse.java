package com.example.auth_system.dto;

import com.example.auth_system.entity.Consultant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultantResponse {
    private int consultantID;
    private int userID;
    private String userName;
    private String specialization;
    private String qualification;
    private int yearsExperience;
    private boolean available;
    private String imageCover;

    public static ConsultantResponse fromEntity(Consultant consultant) {
        return ConsultantResponse.builder()
                .consultantID(consultant.getConsultantID())
                .userID(consultant.getUser().getUserId())
                .userName(consultant.getUser().getFirstName() + " " + consultant.getUser().getLastName())
                .specialization(consultant.getSpecialization())
                .qualification(consultant.getQualification())
                .yearsExperience(consultant.getYearsExperience())
                .available(consultant.isAvailable())
                .imageCover(consultant.getImageCover())
                .build();
    }
}
