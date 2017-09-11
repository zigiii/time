package com.alice.time.service.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alice.time.bean.Time;
import com.alice.time.bean.TimeTarget;
import com.alice.time.common.ResponseResult;
import com.alice.time.dao.TimeDao;
import com.alice.time.dao.TimeTargetDao;
import com.alice.time.enumhouse.CodeEnum;
import com.alice.time.service.TimeService;

@Service("timeService")
@Transactional
public class CommonTimeService implements TimeService{
	
	@Autowired
	private TimeDao timeDao;
	
	@Autowired
	private TimeTargetDao timeTargetDao;

	@Override
	public List<Time> queryAll() {
		return timeDao.queryAll();
	}

	@Override
	public ResponseResult queryMostImportantTime() {
		Time time = timeDao.queryMostImportantTime();
		ResponseResult result = new ResponseResult();
		if(null != time){
			result.setCode(CodeEnum.SUCCESS.getCode());
			result.setData(time);
		}else{
			result.setCode(CodeEnum.FAILURE.getCode());
		}
		return result;
	}

	@Override
	public ResponseResult deferTime(Time time) {
		ResponseResult result = new ResponseResult();
		String timeMode = time.getTimeMode();
		TimeTarget timeTarget = new TimeTarget();
		//根据不同模型延长不同倒计时表100目标,200节日
		if("100".equals(timeMode)){
			timeTarget.setTargetId(time.getTimeId());
			timeTarget.setTargetName("我得了100分");
		}else if("200".equals(timeMode)){
			timeTarget.setTargetId(time.getTimeId());
			timeTarget.setTargetName("我得了200分");
		}
		int line = timeTargetDao.updateTimeTarget(timeTarget);
		if(line > 0){
			result.setCode(CodeEnum.SUCCESS.getCode());
		}else{
			result.setCode(CodeEnum.FAILURE.getCode());
		}
		return result;
	}
}
