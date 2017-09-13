package com.alice.time.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.alice.time.bean.Time;

@Mapper
public interface TimeDao {
	public List<Time> queryAll();
	/**
	 * 查询最近的倒计时
	 * @param userId 用户ID
	 * @param pageNum 页数
	 * @param pageSize 每页条数
	 * @return
	 */
	public Time queryMostImportantTime(@Param("userId")int userId,@Param("pageNum")int pageNum,@Param("pageSize")int pageSize);
	
	public List<Time> queryPagingTime(@Param("userId")int userId,@Param("pageNum")int pageNum,@Param("pageSize")int pageSize);
	
	public int countTime(@Param("userId")int userId); 
}
