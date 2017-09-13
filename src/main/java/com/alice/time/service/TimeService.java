package com.alice.time.service;

import java.util.List;

import com.alice.time.bean.Time;
import com.alice.time.common.ResponseResult;

public interface TimeService {
	
	public List<Time> queryAll();

	public ResponseResult queryMostImportantTime();
	
	public ResponseResult queryPagingTime(int pageNum);
	
	public ResponseResult deferTime(Time time);
	
	public ResponseResult changeOverStatus(Time time);
}
