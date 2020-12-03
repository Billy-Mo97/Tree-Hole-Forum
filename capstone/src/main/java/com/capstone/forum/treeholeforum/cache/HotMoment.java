package com.capstone.forum.treeholeforum.cache;

import com.capstone.forum.treeholeforum.DTO.MomentDto;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.stream.Collectors;

public class HotMoment {

    public static List<MomentDto> getMom() {
        List<MomentDto> moms = new ArrayList();
        MomentDto momentBody = new MomentDto();
        momentBody.setMomentName("Hot");
        momentBody.setTags(Arrays.asList("COVID-19", "Work", "TECH"));
        moms.add(momentBody);
        return moms;
    }

    public static String filter(String myMoms) {
        String[] split = StringUtils.split(myMoms, " ");
        List<MomentDto> momDtos = getMom();

        List<String> tagList = momDtos.stream().flatMap(tag -> tag.getTags().stream()).collect(Collectors.toList());
        String invalid = Arrays.stream(split).filter(t -> StringUtils.isEmpty(t) || !tagList.contains(t)).collect(Collectors.joining(","));
        return invalid;
    }
}
