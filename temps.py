def chrono():
    h=0
    m=0
    s=0
    while m>=0:
        m+=int(input('combien de minutes?'))
        s+=int(input('combien de secondes?'))
        
        if (s>=60) :
            m+=1
            s=s-60
        if (m>=60) :
            m=m-60
            h+=1
        print (h,"h",m,"min",s,"s")
    

chrono()