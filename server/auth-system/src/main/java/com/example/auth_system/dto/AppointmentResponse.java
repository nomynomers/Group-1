package com.example.auth_system.dto;

import lombok.*;

@Data
@Builder  //
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AppointmentResponse {
    private int appointmentID;
    private int userID;
    private String name;
    private String meetingLink;
    private String date;
    private String startTime;
    private String endTime;
    private String status;
    private String note;
}