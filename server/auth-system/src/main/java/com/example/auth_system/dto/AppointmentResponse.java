package com.example.auth_system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder  //
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResponse {
    private String consultantName;
    private String meetingLink;
    private String date;
    private String startTime;
}