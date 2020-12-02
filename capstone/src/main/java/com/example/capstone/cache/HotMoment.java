package com.example.capstone.cache;

import com.example.capstone.DTO.*;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.stream.Collectors;

public class HotMoment {

    public static List<MomentBody> getMom() {
        List<MomentBody> moms = new ArrayList();
        MomentBody momentBody = new MomentBody();
        momentBody.setMomentName("Hot");
        momentBody.setTags(Arrays.asList("COVID-19", "Work", "TECH"));
        moms.add(momentBody);
        return moms;
    }

    public static String filter(String myMoms) {
        String[] split = StringUtils.split(myMoms, " ");
        List<MomentBody> momDtos = getMom();

        List<String> tagList = momDtos.stream().flatMap(tag -> tag.getTags().stream()).collect(Collectors.toList());
        String invalid = Arrays.stream(split).filter(t -> StringUtils.isEmpty(t) || !tagList.contains(t)).collect(Collectors.joining(","));
        return invalid;
    }
}
