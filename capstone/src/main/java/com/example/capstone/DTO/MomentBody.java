package com.example.capstone.DTO;

import java.util.List;
import lombok.Data;


@Data
public class MomentBody {
    private String momentName;
    private List<String> tags;
}