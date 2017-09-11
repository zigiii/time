package com.alice.time.service;

import java.util.List;

import com.alice.time.bean.Time;
import com.alice.time.common.ResponseResult;

public interface TimeService {
	
	public List<Time> queryAll();

	public ResponseResult queryMostImportantTime();
	
	public ResponseResult deferTime(Time timeTarget);
}
