package com.alice.time.dao;

import org.apache.ibatis.annotations.Mapper;

import com.alice.time.bean.TimeTarget;

@Mapper
public interface TimeTargetDao {
	public int updateTimeTarget(TimeTarget timeTarget);
}
