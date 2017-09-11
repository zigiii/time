package com.alice.time.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.alice.time.bean.Time;

@Mapper
public interface TimeDao {
	public List<Time> queryAll();
	public Time queryMostImportantTime();
}
